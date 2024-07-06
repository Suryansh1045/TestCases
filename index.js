const express= require('express')
const { exec } = require('child_process');
require('dotenv').config()

const app = express();


const PORT = process.env.PORT || 5000;

const parseTestResults = (output) => {
    const passedTests = [];
    const failedTests = [];
  
    // Custom parsing logic depending on your test runner's output
    const lines = output.split('\n');
    let currentTest = null;
  
    lines.forEach(line => {
      line = line.trim();
      
      if (line.startsWith('✔')) {
        passedTests.push(line.substring(1).trim());
      } else if (line.startsWith('TestCase')) {
        currentTest = line.trim();
      } else if (currentTest && (line.startsWith('Error:') || line.startsWith('at'))) {
        failedTests.push({
          test: currentTest,
          error: line
        });
        currentTest = null;
      }
    });
  
    return { passedTests, failedTests };
  };



app.get('/run-test', (req, res) => {
    console.log("api triggered")
  exec('npm run testDBQ', (error, stdout, stderr) => {
    console.log("child process executed");
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    const output = stdout + stderr;
    const { passedTests, failedTests } = parseTestResults(output);

    res.json({
      status: 'completed',
      passedTests,
      failedTests,
      total_passed_test_case:passedTests.length,
      total_failed_test_case:failedTests.length
    });
  });
});

app.get('/run-testIC', (req, res) => {
  console.log("api triggered")
exec('npm run testIC', (error, stdout, stderr) => {
  console.log("child process executed");
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  const output = stdout + stderr;
  const { passedTests, failedTests } = parseTestResults(output);

  res.json({
    status: 'completed',
    passedTests,
    failedTests,
    total_passed_test_case:passedTests.length,
    total_failed_test_case:failedTests.length
  });
});
});


const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

server.timeout = 1500000; 