var db = require('../../db.js')

var expect = require('chai').expect

describe('making a post', function() {
    it('logs in and creates a new post', function() {
        browser.get('http://localhost:3001')

        element(by.id('write-post')).click()
        
        browser.waitForAngular().then(function() {
            var post = {
                title: "test",
                text: "test",
                public: true
            }

            element(by.model('post.title')).sendKeys(post.title)
            element(by.model('post.text')).sendKeys(post.text)
            
            element(by.id('submit-post')).click()
            
            element(by.id('posts')).click()
           
            setTimeout(function() {
                browser.waitForAngular().then(function() {
                     element(by.model('title')).getText().then(function(text) {
                        expect(text).to.contain('test')
                    })
                 })
            }, 3000000)
        })
        
    })
    afterEach(function() {
        db.connection.db.dropDatabase()
    })
})

