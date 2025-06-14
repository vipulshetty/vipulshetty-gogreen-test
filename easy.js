const GoGreen = require('./goGreen');
const moment = require('moment');

async function easyMode() {
    console.log('🚀 EASY MODE - One Click Realistic GitHub Activity!');
    console.log('==================================================\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // Generate 1 month of SUPER realistic activity (for testing)
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');

    console.log('🎯 Generating 1 month of SUPER realistic activity...');
    console.log('This will include natural gaps, vacations, and realistic patterns!\n');
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Auto-calculate stats
    const totalDays = moment(endDate).diff(moment(startDate), 'days') + 1;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    
    console.log('\n✅ DONE! Here\'s what was created:');
    console.log('=====================================');
    console.log(`📅 Period: ${startDate} to ${endDate}`);
    console.log(`📝 Total commits: ${goGreen.commitsData.length}`);
    console.log(`📈 Active days: ${daysWithCommits}`);
    console.log(`📉 Empty days: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`🎯 Realism level: MAXIMUM!\n`);
    
    console.log('🎉 Your activity looks completely natural now!');
    console.log('Just push to GitHub and enjoy your green squares! 🟢\n');
    
    console.log('📋 Next: Create a new repo and push:');
    console.log('1. Go to github.com and create a new repository');
    console.log('2. Run: git remote add origin https://github.com/vipulshetty/YOUR_REPO_NAME.git');
    console.log('3. Run: git push -u origin main');
    console.log('4. Check your profile! 🎯');
}

easyMode().catch(console.error);
