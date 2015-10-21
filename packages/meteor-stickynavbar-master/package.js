Package.describe({
  name: 'johnantoni:meteor-stickynav2',
  summary: 'stickyNavbar.js: Fancy sticky navigation jQuery plugin with smart anchor link highlighting.',
  version: '0.0.2',
  git: 'https://github.com/johnantoni/meteor-stickynavbar',
  documentation: 'README.md'
});

Package.on_use(function(api) {
  api.add_files([
    'stickyNavbar.js/animate.min.css',
    'stickyNavbar.js/jquery.stickyNavbar.min.js'
  ], ['client']);
});
