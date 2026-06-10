"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  const [activeTab, setActiveTab] = useState<'analytics' | 'activity' | 'profile'>('analytics');

  const filteredUsers = initialUsers.filter(u => 
    !search || 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.classCode?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedUser = initialUsers.find(u => u.id === selectedStudentId);

  // Filter logs for selected user
  const displayLogs = selectedStudentId 
    ? eventLogs.filter(log => log.userId === selectedStudentId)
    : eventLogs;

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

  return (
    <div className={styles.grid}>
      {/* Access Codes Section */}
      <section className={`glass-panel ${styles.panel}`}>
        <h3>Access Code Management</h3>
        <form action={createAccessCodeAction} className={styles.createCodeForm}>
          <input type="text" name="code" placeholder="e.g. CLASS-2026" required className={styles.input} />
          <button type="submit" className={styles.submitBtn}>Generate Code</button>
        </form>
        <div className={styles.codeList}>
          {accessCodes.map(code => (
            <div key={code.id} className={styles.codeItem}>
              <span className={styles.codeText}>{code.code}</span>
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
          <h3 style={{ margin: 0 }}>Student Progress Matrix</h3>
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
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                {[...Array(12)].map((_, i) => <th key={i}>M{i + 1}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(student => (
                <tr 
                  key={student.id} 
                  onClick={() => handleRowClick(student.id)}
                  className={selectedStudentId === student.id ? styles.selectedRow : styles.interactiveRow}
                >
                  <td>{student.name || student.email}</td>
                  <td>{student.classCode || '-'}</td>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(modId => {
                    const prog = student.progress.find((p: any) => p.moduleId === String(modId));
                    let statusIcon = "🔒";
                    if (prog?.status === "COMPLETED") statusIcon = "✅";
                    else if (prog?.status === "IN_PROGRESS" || (modId === 1 && !prog)) statusIcon = "🔄";
                    
                    return <td key={modId} title={prog?.status || "LOCKED"}>{statusIcon}</td>;
                  })}
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr><td colSpan={14} style={{textAlign:'center', padding:'1rem'}}>No students found.</td></tr>
              )}
            </tbody>
          </table>
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
          {selectedUser && (
            <div className={styles.filterBadge}>
              Filtering by: {selectedUser.name || selectedUser.email}
              <button onClick={() => { setSelectedStudentId(null); setActiveTab('analytics'); }}>✕</button>
            </div>
          )}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'analytics' && (
            <div className={styles.analyticsGrid}>
              <div className={styles.chartBox}>
                <h4>{selectedUser ? 'User Progress' : 'Module Completion Rate'}</h4>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={moduleCompletionData}>
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={styles.chartBox}>
                <h4>{selectedUser ? 'User Action Breakdown' : 'Global Action Distribution'}</h4>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={actionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {actionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={styles.activityList}>
              {displayLogs.map((log) => (
                <div key={log.id} className={styles.activityItem}>
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
          )}

          {activeTab === 'profile' && selectedUser && (
            <div className={styles.profileView}>
              <h2>{selectedUser.name || selectedUser.email}</h2>
              <p><strong>Class:</strong> {selectedUser.classCode || 'N/A'}</p>
              <p><strong>Total Recorded Actions:</strong> {displayLogs.length}</p>
              
              <div style={{ marginTop: '2rem' }}>
                <h3>Quick Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.statCard}>
                    <div>Completed Modules</div>
                    <h2>{selectedUser.progress?.filter((p:any) => p.status === 'COMPLETED').length || 0} / 12</h2>
                  </div>
                  <div className={styles.statCard}>
                    <div>Last Active</div>
                    <h2>{displayLogs[0] ? new Date(displayLogs[0].timestamp).toLocaleDateString() : 'Never'}</h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
