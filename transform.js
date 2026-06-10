const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/dashboard/admin/AdminDashboardClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state variables
content = content.replace(
  `const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);`,
  `const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isPrintingMatrix, setIsPrintingMatrix] = useState(false);
  const [isPrintingReport, setIsPrintingReport] = useState(false);`
);

// 2. Update handlers
content = content.replace(
  `  const handlePrintMatrix = () => {
    document.body.classList.add('printMatrixMode');
    window.print();
  };

  const handlePrintReport = () => {
    document.body.classList.add('printReportMode');
    window.print();
  };`,
  `  const handlePrintMatrix = () => {
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
  };`
);

// 3. Extract render components
const renderComponents = `
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
    <div className={isPrint ? '' : styles.analyticsGrid} style={isPrint ? { display: 'flex', flexDirection: 'column', gap: '2rem' } : undefined}>
      <div className={styles.chartBox} style={isPrint ? { border: '1px solid #ccc', background: 'none', color: 'black' } : undefined}>
        <h4>{selectedUser ? 'User Progress' : 'Module Completion Rate'}</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={moduleCompletionData}>
              <XAxis dataKey="name" stroke={isPrint ? "black" : "#fff"} />
              <YAxis stroke={isPrint ? "black" : "#fff"} />
              <Tooltip />
              <Bar dataKey="completed" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.chartBox} style={isPrint ? { border: '1px solid #ccc', background: 'none', color: 'black' } : undefined}>
        <h4>{selectedUser ? 'User Action Breakdown' : 'Global Action Distribution'}</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
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
              >
                {actionData.map((entry, index) => (
                  <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
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
          <h1 style={{ marginBottom: '2rem' }}>Analytics Report {selectedUser ? \`- \${selectedUser.name || selectedUser.email}\` : ''}</h1>
          {renderAnalyticsCharts(true)}
        </div>
        <div style={{ pageBreakAfter: selectedUser ? 'always' : 'auto', padding: '2rem' }}>
          <h1 style={{ marginBottom: '2rem' }}>Activity Feed {selectedUser ? \`- \${selectedUser.name || selectedUser.email}\` : ''}</h1>
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
    <div className={\`\${styles.grid} \${selectedStudentId && activeTab === 'profile' ? styles.isProfileView : ''}\`}>
`;

content = content.replace(
  /  return \(\s*<div className=\{`\$\{styles\.grid\}.*?`\}>/s,
  renderComponents
);

// 4. Replace the old table and charts with calls to the extracted renders to avoid massive duplication
// But wait, the original code inside the return needs to just call the render functions!
content = content.replace(
  /<table className=\{styles\.matrixTable\}>.*?<\/table>/s,
  `{renderMatrixTable()}`
);

content = content.replace(
  /<div className=\{styles\.analyticsGrid\}>.*?<\/div>\s*<\/div>\s*\)\}/s,
  `{renderAnalyticsCharts(false)}\n          )}`
);

content = content.replace(
  /<div className=\{styles\.activityList\}>.*?<\/div>\s*\)\}/s,
  `{renderActivityFeed(false)}\n          )}`
);

content = content.replace(
  /<div className=\{styles\.profileView\}>.*?<\/div>\s*<\/div>\s*\)\}/s,
  `{renderProfileStats(false)}\n          )}`
);

fs.writeFileSync(filePath, content);
console.log('Successfully updated AdminDashboardClient.tsx');
