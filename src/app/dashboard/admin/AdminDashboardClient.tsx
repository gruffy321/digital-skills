"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useEffect } from "react";

type User = any;
type AccessCode = any;
type EventLog = any;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

export default function AdminDashboardClient({ 
  initialUsers, 
  accessCodes, 
  eventLogs,
  createAccessCodeAction,
  revokeAccessCodeAction
}: { 
  initialUsers: User[];
  accessCodes: AccessCode[];
  eventLogs: EventLog[];
  createAccessCodeAction: (formData: FormData) => void;
  revokeAccessCodeAction: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isPrintingMatrix, setIsPrintingMatrix] = useState(false);
  const [isPrintingReport, setIsPrintingReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'activity' | 'profile'>('analytics');

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove('printMatrixMode', 'printReportMode');
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const handlePrintMatrix = () => {
    setIsPrintingMatrix(true);
    setTimeout(() => {
      window.print();
      setIsPrintingMatrix(false);
    }, 100);
  };

  const handlePrintReport = () => {
    setIsPrintingReport(true);
    setTimeout(() => {
      window.print();
      setIsPrintingReport(false);
    }, 100);
  };

  const filteredUsers = initialUsers.filter(u => 
    !search || 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.classCode?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedUser = initialUsers.find(u => u.id === selectedStudentId);

  // Filter logs for selected user OR filtered users (class/group)
  const displayLogs = selectedStudentId 
    ? eventLogs.filter(log => log.userId === selectedStudentId)
    : eventLogs.filter(log => filteredUsers.some(u => u.id === log.userId));

  // Chart Data: Module Completion
  const moduleCompletionData = [1,2,3,4,5,6,7,8,9,10,11,12].map(modId => {
    let completedCount = 0;
    const usersToCount = selectedStudentId && selectedUser ? [selectedUser] : filteredUsers;
    
    usersToCount.forEach(user => {
      if (user.progress?.some((p: any) => p.moduleId === String(modId) && p.status === "COMPLETED")) {
        completedCount++;
      }
    });
    return { name: `M${modId}`, completed: completedCount };
  });

  // Chart Data: Action Types (Donut)
  const actionCounts: Record<string, number> = {};
  displayLogs.forEach(log => {
    actionCounts[log.actionType] = (actionCounts[log.actionType] || 0) + 1;
  });
  const actionData = Object.keys(actionCounts).map(key => ({
    name: key.replace(/_/g, ' '),
    value: actionCounts[key]
  })).sort((a,b) => b.value - a.value).slice(0, 6);

  const handleRowClick = (userId: string) => {
    if (selectedStudentId === userId) {
      setSelectedStudentId(null);
      if (activeTab === 'profile') setActiveTab('analytics');
    } else {
      setSelectedStudentId(userId);
      setActiveTab('profile');
    }
  };


  const renderMatrixTable = () => (
    <table className={styles.matrixTable} style={{ color: isPrintingMatrix ? 'black' : 'inherit', width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Student</th>
          <th style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Class</th>
          {[...Array(12)].map((_, i) => <th key={i} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>M{i + 1}</th>)}
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(student => (
          <tr 
            key={student.id} 
            onClick={() => !isPrintingMatrix && handleRowClick(student.id)}
            className={!isPrintingMatrix && selectedStudentId === student.id ? styles.selectedRow : styles.interactiveRow}
          >
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{student.name || student.email}</td>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{student.classCode || '-'}</td>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(modId => {
              const prog = student.progress.find((p: any) => p.moduleId === String(modId));
              let statusIcon = "🔒";
              if (prog?.status === "COMPLETED") statusIcon = "✅";
              else if (prog?.status === "IN_PROGRESS" || (modId === 1 && !prog)) statusIcon = "🔄";
              
              return <td key={modId} title={prog?.status || "LOCKED"} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{statusIcon}</td>;
            })}
          </tr>
        ))}
        {filteredUsers.length === 0 && (
          <tr><td colSpan={14} style={{textAlign:'center', padding:'1rem'}}>No students found.</td></tr>
        )}
      </tbody>
    </table>
  );

  const renderAnalyticsCharts = (isPrint: boolean) => (
    <div className={isPrint ? '' : styles.analyticsGrid} style={isPrint ? { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' } : undefined}>
      <div className={styles.chartBox} style={isPrint ? { border: '1px solid #ccc', background: 'none', color: 'black', width: '100%', pageBreakInside: 'avoid' } : undefined}>
        <h4>{selectedUser ? 'User Progress' : 'Module Completion Rate'}</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleCompletionData}>
              <XAxis dataKey="name" stroke={isPrint ? "black" : "#fff"} />
              <YAxis stroke={isPrint ? "black" : "#fff"} />
              <Tooltip />
              <Bar dataKey="completed" fill="#4ade80" radius={[4, 4, 0, 0]} isAnimationActive={!isPrint} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.chartBox} style={isPrint ? { border: '1px solid #ccc', background: 'none', color: 'black', width: '100%', pageBreakInside: 'avoid' } : undefined}>
        <h4>{selectedUser ? 'User Action Breakdown' : 'Global Action Distribution'}</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={actionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label
                isAnimationActive={!isPrint}
              >
                {actionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderActivityFeed = (isPrint: boolean) => (
    <div className={styles.activityList} style={isPrint ? { color: 'black' } : undefined}>
      {displayLogs.map((log) => (
        <div key={log.id} className={styles.activityItem} style={isPrint ? { borderBottom: '1px solid #ccc', background: 'none' } : undefined}>
          <div className={styles.activityTime}>
            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={styles.activityDetails}>
            <strong>{log.user?.name || log.user?.email} </strong>
            {log.actionType} in Module {log.module?.sequenceNumber || log.moduleId}
          </div>
        </div>
      ))}
      {displayLogs.length === 0 && <p>No activity yet.</p>}
    </div>
  );

  const renderProfileStats = (isPrint: boolean) => (
    selectedUser ? (
      <div className={styles.profileView} style={isPrint ? { background: 'none', color: 'black', border: 'none' } : undefined}>
        <h2>{selectedUser.name || selectedUser.email}</h2>
        <p><strong>Class:</strong> {selectedUser.classCode || 'N/A'}</p>
        <p><strong>Total Recorded Actions:</strong> {displayLogs.length}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Quick Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.statCard} style={isPrint ? { border: '1px solid #ccc', background: 'none' } : undefined}>
              <div>Completed Modules</div>
              <h2>{selectedUser.progress?.filter((p:any) => p.status === 'COMPLETED').length || 0} / 12</h2>
            </div>
            <div className={styles.statCard} style={isPrint ? { border: '1px solid #ccc', background: 'none' } : undefined}>
              <div>Last Active</div>
              <h2>{selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleDateString() : 'Never'}</h2>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Deep Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.statCard} style={isPrint ? { border: '1px solid #ccc', background: 'none' } : undefined}>
              <div>First-Time Pass Rate</div>
              <h2>
                {selectedUser.progress?.length > 0 
                  ? Math.round((selectedUser.progress.filter((p:any) => p.passedFirstTime).length / selectedUser.progress.length) * 100) 
                  : 0}%
              </h2>
            </div>
            <div className={styles.statCard} style={isPrint ? { border: '1px solid #ccc', background: 'none' } : undefined}>
              <div>Total Incorrect Clicks</div>
              <h2>
                {selectedUser.progress?.reduce((sum: number, p: any) => sum + (p.incorrectClicks || 0), 0) || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  if (isPrintingMatrix) {
    return (
      <div style={{ background: 'white', color: 'black', padding: '2rem', minHeight: '100vh', width: '100%' }}>
        <h2 style={{ marginBottom: '1rem' }}>Student Progress Matrix</h2>
        {renderMatrixTable()}
      </div>
    );
  }

  if (isPrintingReport) {
    return (
      <div style={{ background: 'white', color: 'black', minHeight: '100vh', width: '100%' }}>
        <div style={{ pageBreakAfter: 'always', padding: '2rem' }}>
          <h1 style={{ marginBottom: '2rem' }}>Analytics Report {selectedUser ? `- ${selectedUser.name || selectedUser.email}` : ''}</h1>
          {renderAnalyticsCharts(true)}
        </div>
        <div style={{ pageBreakAfter: selectedUser ? 'always' : 'auto', padding: '2rem' }}>
          <h1 style={{ marginBottom: '2rem' }}>Activity Feed {selectedUser ? `- ${selectedUser.name || selectedUser.email}` : ''}</h1>
          {renderActivityFeed(true)}
        </div>
        {selectedUser && (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Student Profile</h1>
            {renderProfileStats(true)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${selectedStudentId && activeTab === 'profile' ? styles.isProfileView : ''}`}>

      {/* Access Codes Section */}
      <section className={`glass-panel ${styles.panel} ${styles.accessCodePanel}`}>
        <h3>Access Code Management</h3>
        <form action={createAccessCodeAction} className={styles.createCodeForm}>
          <input type="text" name="code" placeholder="e.g. CLASS-2026" required className={styles.input} />
          <button type="submit" className={styles.submitBtn}>Generate Code</button>
        </form>
        <div className={styles.codeList}>
          {accessCodes.map(code => (
            <div key={code.id} className={styles.codeItem}>
              <span 
                className={styles.codeText} 
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => { setSearch(code.code); setSelectedStudentId(null); }}
                title="Click to filter analytics by this class code"
              >
                {code.code}
              </span>
              <span className={code.isActive ? styles.activeBadge : styles.inactiveBadge}>
                {code.isActive ? "Active" : "Revoked"}
              </span>
              {code.isActive && (
                <form action={() => revokeAccessCodeAction(code.id)}>
                  <button type="submit" className={styles.revokeBtn}>Revoke</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Student Matrix Section */}
      <section className={`glass-panel ${styles.panel} ${styles.matrixPanel}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ margin: 0 }}>Student Progress Matrix</h3>
            <button 
              onClick={handlePrintMatrix}
              className={`${styles.tabBtn} ${styles.printBtn}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}
            >
              🖨️ Print Matrix
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, class code..." 
              className={styles.input}
              style={{ width: '250px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
        <div className={styles.tableWrapper}>
          {renderMatrixTable()}
        </div>
      </section>

      {/* Bottom Tabs Section */}
      <section className={`glass-panel ${styles.panel} ${styles.bottomPanel}`}>
        <div className={styles.tabHeader}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'activity' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            📋 Activity Feed
          </button>
          {selectedUser && (
            <button 
              className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Student Profile
            </button>
          )}
          
          <div style={{ flex: 1 }}></div>
          <button 
            onClick={handlePrintReport}
            className={`${styles.tabBtn} ${styles.printBtn}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            🖨️ Print Report
          </button>
          {selectedUser && (
            <div className={styles.filterBadge}>
              Filtering by: {selectedUser.name || selectedUser.email}
              <button onClick={() => { setSelectedStudentId(null); setActiveTab('analytics'); }}>✕</button>
            </div>
          )}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'analytics' && renderAnalyticsCharts(false)}

          {activeTab === 'activity' && renderActivityFeed(false)}

          {activeTab === 'profile' && renderProfileStats(false)}
        </div>
      </section>
    </div>
  );
}
