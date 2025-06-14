const GoGreen = require('./goGreen');
const moment = require('moment');

async function superRealistic() {
    console.log('🎯 SUPER REALISTIC GitHub Activity Generator');
    console.log('===========================================');
    console.log('This creates VERY realistic activity that looks completely natural!\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // Choose time period
    console.log('📅 Choose your time period:');
    console.log('1. Last 3 months (recommended)');
    console.log('2. Last 6 months');
    console.log('3. Last 1 year');
    console.log('4. Custom period\n');
    
    // For now, let's do 3 months with VERY realistic patterns
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
    
    console.log(`🚀 Generating SUPER realistic activity from ${startDate} to ${endDate}`);
    console.log('\n🎯 This includes:');
    console.log('   ✅ 42% of days with NO commits (very realistic!)');
    console.log('   ✅ 33% of days with just 1 commit');
    console.log('   ✅ 70% chance of NO weekend activity');
    console.log('   ✅ Random 3-7 day vacation gaps');
    console.log('   ✅ Sick days (random 1-2 day gaps)');
    console.log('   ✅ Monday blues (often no commits)');
    console.log('   ✅ Friday wind-down (less activity)');
    console.log('   ✅ Holiday periods with no activity');
    console.log('   ✅ Rare productive days (4-8 commits)');
    console.log('   ✅ Extremely rare crunch days (10-20 commits)');
    console.log('   ✅ Real commit messages with proper types\n');
    
    console.log('⏳ Generating... (this will look very natural!)\n');
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    console.log('\n🎉 DONE! Your GitHub activity is now SUPER realistic!');
    console.log('\n📊 Summary:');
    console.log(`   📅 Period: ${startDate} to ${endDate}`);
    console.log(`   📝 Total commits: ${goGreen.commitsData.length}`);
    
    // Calculate some stats
    const totalDays = moment(endDate).diff(moment(startDate), 'days') + 1;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    
    console.log(`   📈 Days with activity: ${daysWithCommits}`);
    console.log(`   📉 Days without activity: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`   🎯 This looks completely natural!\n`);
    
    console.log('🚀 Ready to push to GitHub:');
    console.log('   git remote add origin https://github.com/vipulshetty/your-new-repo.git');
    console.log('   git push -u origin main\n');
    
    console.log('💡 Pro tip: This activity pattern will look like a real developer!');
}

superRealistic().catch(console.error);
