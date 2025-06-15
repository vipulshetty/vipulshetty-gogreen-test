const GoGreen = require('./goGreen');
const moment = require('moment');

async function superActive() {
    console.log('🔥 SUPER ACTIVE GitHub Generator');
    console.log('================================');
    console.log('This will create LOTS of commits while still looking realistic!\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // Generate 6 months of HIGH activity
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
    
    console.log(`🚀 Generating 6 months of HIGH activity (${startDate} to ${endDate})`);
    console.log('🔥 This will create 300-500+ commits with realistic patterns!\n');
    
    // Set to HIGH activity level for maximum commits
    goGreen.randomizer.activityLevel = 'high';
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Calculate stats
    const totalDays = moment(endDate).diff(moment(startDate), 'days') + 1;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    const avgCommitsPerDay = Math.round((goGreen.commitsData.length / daysWithCommits) * 10) / 10;
    
    console.log('🔥 SUPER ACTIVE Results:');
    console.log('========================');
    console.log(`📅 Period: ${startDate} to ${endDate} (${totalDays} days)`);
    console.log(`📝 Total commits: ${goGreen.commitsData.length}`);
    console.log(`📈 Active days: ${daysWithCommits}`);
    console.log(`📉 Empty days: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`⚡ Average commits per active day: ${avgCommitsPerDay}`);
    console.log(`🔥 Activity level: SUPER HIGH!\n`);
    
    console.log('🎉 This should give you a very green GitHub profile!');
    console.log('🚀 Ready to push to GitHub and see those green squares! 🟢');
}

superActive().catch(console.error);
