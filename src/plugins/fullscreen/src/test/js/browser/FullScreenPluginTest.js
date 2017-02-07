asynctest(
  'browser.tinymce.plugins.fullscreen.FullScreenPluginTest',
  [
    'ephox.agar.api.Pipeline',
    'ephox.mcagar.api.LegacyUnit',
    'tinymce.plugins.fullscreen.Plugin',
    'ephox.mcagar.api.TinyLoader',
    'global!tinymce.dom.DOMUtils'
  ],
  function (Pipeline, LegacyUnit, Plugin, TinyLoader, DOMUtils) {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var suite = LegacyUnit.createSuite();

    suite.test('Fullscreen class on html and body tag', function (editor) {
      var bodyTag = document.body;
      var htmlTag = document.documentElement;

      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(bodyTag, "mce-fullscreen"),
        false,
        'Body tag should not have "mce-fullscreen" class before fullscreen command'
      );
      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(htmlTag, "mce-fullscreen"),
        false,
        'Html tag should not have "mce-fullscreen" class before fullscreen command'
      );

      editor.execCommand('mceFullScreen');

      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(bodyTag, "mce-fullscreen"),
        true,
        'Body tag should have "mce-fullscreen" class after fullscreen command'
      );
      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(htmlTag, "mce-fullscreen"),
        true,
        'Html tag should have "mce-fullscreen" class after fullscreen command'
      );

      editor.execCommand('mceLink', true);

      var windows = editor.windowManager.getWindows();
      var linkWindow = windows[0];

      LegacyUnit.equal(typeof linkWindow, 'object', 'Link window is an object');

      linkWindow.close();

      LegacyUnit.equal(windows.length, 0, 'No windows exist');

      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(bodyTag, "mce-fullscreen"),
        true,
        'Body tag should still have "mce-fullscreen" class after window is closed'
      );
      LegacyUnit.equal(
        DOMUtils.DOM.hasClass(htmlTag, "mce-fullscreen"),
        true,
        'Html tag should still have "mce-fullscreen" class after window is closed'
      );

      editor.execCommand('mceFullScreen');
    });

    TinyLoader.setup(function (editor, onSuccess, onFailure) {
      Pipeline.async({}, suite.toSteps(editor), onSuccess, onFailure);
    }, {
      plugins: 'fullscreen link'
    }, success, failure);
  }
);