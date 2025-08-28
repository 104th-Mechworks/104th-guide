const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-authors',
    
    async loadContent() {
      // Load authors.yml file
      const authorsPath = path.join(context.siteDir, 'updates', 'authors.yml');
      if (fs.existsSync(authorsPath)) {
        const authorsContent = fs.readFileSync(authorsPath, 'utf8');
        return yaml.load(authorsContent);
      }
      return {};
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      
      // Make authors data available globally
      setGlobalData({
        authors: content,
      });
    },
  };
};