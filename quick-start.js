const GoGreen = require('./goGreen');
const moment = require('moment');

async function quickStart() {
    console.log('🚀 Quick Start - Generating 2 weeks of realistic GitHub activity!');
    console.log('================================================================\n');
    
    const goGreen = new GoGreen();
    
    // Initialize repository
    console.log('🔧 Initializing repository...');
    await goGreen.initializeRepo();
    
    // Generate realistic activity for last 2 weeks
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(2, 'weeks').format('YYYY-MM-DD');
    
    console.log(`📅 Generating realistic commits from ${startDate} to ${endDate}`);
    console.log('🎯 This includes realistic developer patterns:\n');
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    console.log('\n✅ Done! Your GitHub activity has been generated!');
    console.log('\n📋 Next Steps:');
    console.log('1. Check your commits: git log --oneline -10');
    console.log('2. Add remote: git remote add origin https://github.com/yourusername/your-repo.git');
    console.log('3. Push to GitHub: git push -u origin main');
    console.log('4. Check your GitHub profile to see the green squares! 🟢');
    
    console.log('\n💡 Pro tip: Create a new repository on GitHub first, then use that URL in step 2');
}

quickStart().catch(console.error);
