# PowerShell script to push ColorChecker to GitHub
# Run this after creating the repository at https://github.com/Pixform-Studios/colorchecker

Write-Host "🚀 Pushing ColorChecker to GitHub..." -ForegroundColor Cyan

# Add remote origin
git remote add origin https://github.com/Pixform-Studios/colorchecker.git

# Push to GitHub
git push -u origin main

Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "🌐 Repository URL: https://github.com/Pixform-Studios/colorchecker" -ForegroundColor Yellow
Write-Host "🎨 GitHub Pages URL: https://pixform-studios.github.io/colorchecker" -ForegroundColor Magenta

Write-Host "`n📝 Next steps:" -ForegroundColor White
Write-Host "1. Go to repository Settings > Pages" -ForegroundColor Gray
Write-Host "2. Set Source to 'Deploy from a branch'" -ForegroundColor Gray
Write-Host "3. Select 'main' branch and '/ (root)' folder" -ForegroundColor Gray
Write-Host "4. Click Save to enable GitHub Pages" -ForegroundColor Gray
