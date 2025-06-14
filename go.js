const GoGreen = require('./goGreen');
const moment = require('moment');

async function justGo() {
    console.log('🌱 goGreen - Just GO!');
    console.log('====================');
    console.log('One command = Perfect realistic GitHub activity!\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // 6 months of ultra-realistic activity
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
    
    console.log(`🚀 Creating 6 months of realistic activity (${startDate} to ${endDate})`);
    console.log('⏳ This includes natural gaps, weekends off, vacations...\n');
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Stats
    const totalDays = moment(endDate).diff(moment(startDate), 'days') + 1;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    
    console.log('✅ DONE! Ultra-realistic activity created:');
    console.log(`   📝 ${goGreen.commitsData.length} commits over ${totalDays} days`);
    console.log(`   📉 ${percentageEmpty}% empty days (very realistic!)`);
    console.log(`   🎯 Looks like a real developer!\n`);
    
    console.log('🚀 Ready to push? Just run these 3 commands:');
    console.log('1. Create repo on GitHub');
    console.log('2. git remote add origin https://github.com/vipulshetty/YOUR_REPO.git');
    console.log('3. git push -u origin main\n');
    console.log('🎉 Then check your profile for green squares!');
}

justGo().catch(console.error);
