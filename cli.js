#!/usr/bin/env node

const GoGreen = require('./goGreen');
const moment = require('moment');
const fs = require('fs');
const readline = require('readline');

class GoGreenCLI {
    constructor() {
        this.goGreen = new GoGreen();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.config = this.loadConfig();
    }

    loadConfig() {
        try {
            return JSON.parse(fs.readFileSync('config.json', 'utf8'));
        } catch (error) {
            console.log('⚠️  Could not load config.json, using defaults');
            return {
                defaultSettings: {
                    minCommitsPerDay: 1,
                    maxCommitsPerDay: 5
                },
                patterns: {}
            };
        }
    }

    async question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }

    async showMenu() {
        console.log('\n🌱 Welcome to goGreen CLI!');
        console.log('================================');
        console.log('1. Generate commits for date range');
        console.log('2. Create pattern');
        console.log('3. Fill last N days');
        console.log('4. Show available patterns');
        console.log('5. Exit');
        console.log('================================');
        
        const choice = await this.question('Choose an option (1-5): ');
        return choice.trim();
    }

    async generateCommitsForRange() {
        console.log('\n📅 Generate Commits for Date Range');
        console.log('==================================');
        
        const startDate = await this.question('Start date (YYYY-MM-DD): ');
        const endDate = await this.question('End date (YYYY-MM-DD): ');
        const minCommits = await this.question(`Min commits per day (default: ${this.config.defaultSettings.minCommitsPerDay}): `) || this.config.defaultSettings.minCommitsPerDay;
        const maxCommits = await this.question(`Max commits per day (default: ${this.config.defaultSettings.maxCommitsPerDay}): `) || this.config.defaultSettings.maxCommitsPerDay;
        
        console.log('\n🚀 Generating commits...');
        await this.goGreen.generateCommitsForRange(startDate, endDate, parseInt(minCommits), parseInt(maxCommits));
        this.goGreen.saveCommitsData();
        console.log('✅ Done!');
    }

    async createPattern() {
        console.log('\n🎨 Create Pattern');
        console.log('=================');
        
        this.showAvailablePatterns();
        
        const patternName = await this.question('Pattern name (or "custom" for custom pattern): ');
        const startDate = await this.question('Start date (YYYY-MM-DD): ');
        
        if (patternName.toLowerCase() === 'custom') {
            console.log('Enter your custom pattern (JSON format):');
            console.log('Example: [[0,1,2],[1,2,1],[0,1,0]]');
            const patternInput = await this.question('Pattern: ');
            
            try {
                const pattern = JSON.parse(patternInput);
                await this.goGreen.createPattern(pattern, startDate);
            } catch (error) {
                console.log('❌ Invalid pattern format');
                return;
            }
        } else if (this.config.patterns[patternName]) {
            await this.goGreen.createPattern(this.config.patterns[patternName], startDate);
        } else {
            console.log('❌ Pattern not found');
            return;
        }
        
        this.goGreen.saveCommitsData();
        console.log('✅ Pattern created!');
    }

    async fillLastNDays() {
        console.log('\n📊 Fill Last N Days');
        console.log('===================');
        
        const days = await this.question('Number of days: ');
        const minCommits = await this.question(`Min commits per day (default: ${this.config.defaultSettings.minCommitsPerDay}): `) || this.config.defaultSettings.minCommitsPerDay;
        const maxCommits = await this.question(`Max commits per day (default: ${this.config.defaultSettings.maxCommitsPerDay}): `) || this.config.defaultSettings.maxCommitsPerDay;
        
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(parseInt(days), 'days').format('YYYY-MM-DD');
        
        console.log(`\n🚀 Filling ${days} days (${startDate} to ${endDate})...`);
        await this.goGreen.generateCommitsForRange(startDate, endDate, parseInt(minCommits), parseInt(maxCommits));
        this.goGreen.saveCommitsData();
        console.log('✅ Done!');
    }

    showAvailablePatterns() {
        console.log('\n📋 Available Patterns:');
        Object.keys(this.config.patterns).forEach(pattern => {
            console.log(`  - ${pattern}`);
        });
        console.log('  - custom (define your own)');
    }

    async run() {
        console.log('🔧 Initializing repository...');
        await this.goGreen.initializeRepo();
        
        while (true) {
            try {
                const choice = await this.showMenu();
                
                switch (choice) {
                    case '1':
                        await this.generateCommitsForRange();
                        break;
                    case '2':
                        await this.createPattern();
                        break;
                    case '3':
                        await this.fillLastNDays();
                        break;
                    case '4':
                        this.showAvailablePatterns();
                        break;
                    case '5':
                        console.log('👋 Goodbye!');
                        this.rl.close();
                        return;
                    default:
                        console.log('❌ Invalid choice');
                }
            } catch (error) {
                console.error('❌ Error:', error.message);
            }
        }
    }
}

// Run CLI if this file is executed directly
if (require.main === module) {
    const cli = new GoGreenCLI();
    cli.run().catch(console.error);
}

module.exports = GoGreenCLI;
