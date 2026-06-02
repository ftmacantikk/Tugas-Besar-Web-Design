# kill_unused_dev.ps1
# Continuously terminate any running Node or npm processes.
# This script runs an infinite loop checking for processes named 'node' or 'npm' and kills them.
# Use with caution – it will terminate all matching processes immediately.

while ($true) {
    $nodeProcs = Get-Process -Name node -ErrorAction SilentlyContinue
    $npmProcs = Get-Process -Name npm -ErrorAction SilentlyContinue
    if ($nodeProcs) {
        Write-Host "Killing $(($nodeProcs | Measure-Object).Count) node process(es)..."
        $nodeProcs | Stop-Process -Force
    }
    if ($npmProcs) {
        Write-Host "Killing $(($npmProcs | Measure-Object).Count) npm process(es)..."
        $npmProcs | Stop-Process -Force
    }
    Start-Sleep -Seconds 5
}
