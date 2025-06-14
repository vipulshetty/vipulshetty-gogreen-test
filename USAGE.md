# 🚀 How to Run goGreen

## Quick Start

### 1. Interactive CLI (Recommended)
```bash
npm start
```
This opens an interactive menu where you can:
- Generate commits for specific date ranges
- Create patterns (heart, smile, wave)
- Fill last N days with activity
- View available patterns

### 2. Realistic Examples (Most Popular)
```bash
npm run realistic
```
Uses realistic developer patterns that look natural:
- ✅ Less activity on weekends
- ✅ Realistic commit times (work hours)
- ✅ Proper commit types (feat, fix, docs, refactor, test, chore)
- ✅ Some days with no commits
- ✅ Occasional high-activity days (crunch time)

### 3. Basic Examples
```bash
npm run examples
```
Simple examples with customizable patterns.

### 4. Quick Test
```bash
npm test
```
Creates a few test commits to verify everything works.

## 🎯 Realistic vs Basic Mode

### Realistic Mode (Recommended)
- **Weekday Focus**: More commits during work hours (9 AM - 9 PM)
- **Weekend Reduction**: 60% less activity on weekends
- **Holiday Awareness**: Reduced activity on holidays
- **Natural Patterns**: Some days with 0 commits, occasional burst days
- **Proper Commit Types**: 
  - 30% bug fixes (`fix:`)
  - 25% new features (`feat:`)
  - 15% refactoring (`refactor:`)
  - 12% maintenance (`chore:`)
  - 10% documentation (`docs:`)
  - 8% tests (`test:`)

### Basic Mode
- Random commits between min/max range
- Simple commit messages
- No day-of-week patterns

## 📅 Example Usage Scenarios

### Fill Your Last 3 Months
Edit `realistic-examples.js` and uncomment:
```javascript
await realisticLast3Months();
```

### Simulate a Project Development
```javascript
await projectCycle();
```
Creates a 6-month project with phases:
- Planning (low activity)
- Development (high activity)
- Testing (medium activity)
- Bug fixes (high activity)
- Maintenance (low activity)

### Learning Curve Simulation
```javascript
await learningCurve();
```
Shows progression over 2 months of learning.

## 🎨 Custom Patterns

### Using CLI
1. Run `npm start`
2. Choose option 2 (Create pattern)
3. Select from available patterns or create custom

### Available Patterns
- **heart**: ❤️ Heart shape
- **smile**: 😊 Smiley face
- **wave**: 🌊 Wave pattern
- **custom**: Define your own 2D array

### Custom Pattern Example
```javascript
const pattern = [
    [0, 1, 1, 0, 1, 1, 0],  // Week 1
    [1, 2, 2, 1, 2, 2, 1],  // Week 2
    [1, 2, 2, 2, 2, 2, 1],  // Week 3
    [0, 1, 2, 2, 2, 1, 0],  // Week 4
    [0, 0, 1, 2, 1, 0, 0],  // Week 5
    [0, 0, 0, 1, 0, 0, 0],  // Week 6
    [0, 0, 0, 0, 0, 0, 0]   // Week 7
];
```
Numbers represent commit intensity (0 = no commits, higher = more commits).

## 📊 After Running

### Check Your Commits
```bash
git log --oneline -20
```

### View Activity File
```bash
cat activity.txt
```

### Check Commit Data
```bash
cat commits-data.json
```

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

## ⚠️ Important Notes

1. **Creates Real Commits**: This tool creates actual Git commits
2. **Backup First**: Always backup your repository before running
3. **Test Small**: Start with small date ranges
4. **Push Required**: You need to push to GitHub to see activity on your profile
5. **Use Responsibly**: Don't abuse GitHub's contribution system

## 🔧 Troubleshooting

### Git Not Initialized
```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### No Activity Showing on GitHub
- Make sure you've pushed the commits
- Check that the email matches your GitHub account
- Verify the repository is public or you're a contributor

### Too Many Commits
- Use realistic mode for natural patterns
- Start with smaller date ranges
- Check the generated commits before pushing

## 💡 Pro Tips

1. **Start Small**: Test with 1-2 weeks first
2. **Use Realistic Mode**: Looks more natural
3. **Mix Patterns**: Combine different examples
4. **Check Dates**: Make sure dates are in the past
5. **Backup**: Always backup before major operations

---

**Happy coding! 🌱**
