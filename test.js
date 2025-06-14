const GoGreen = require('./goGreen');
const moment = require('moment');

async function testGoGreen() {
    console.log('🧪 Testing goGreen functionality...\n');
    
    const goGreen = new GoGreen();
    
    // Initialize repository
    console.log('1. Initializing repository...');
    await goGreen.initializeRepo();
    console.log('✅ Repository initialized\n');
    
    // Test creating a few commits for the last 3 days
    console.log('2. Creating test commits for the last 3 days...');
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
    
    console.log(`   Date range: ${startDate} to ${endDate}`);
    await goGreen.generateCommitsForRange(startDate, endDate, 1, 2);
    console.log('✅ Test commits created\n');
    
    // Save commit data
    console.log('3. Saving commit data...');
    goGreen.saveCommitsData();
    console.log('✅ Commit data saved\n');
    
    console.log('🎉 Test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Check your activity.txt file');
    console.log('   2. Check your commits-data.json file');
    console.log('   3. Run "git log" to see your commits');
    console.log('   4. Push to GitHub to see the activity on your profile');
    console.log('\n💡 Usage options:');
    console.log('   - Run "npm start" for interactive CLI');
    console.log('   - Run "npm run examples" to see more examples');
    console.log('   - Edit examples.js to customize your activity');
}

testGoGreen().catch(console.error);
