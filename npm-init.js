var fs = require('fs');

var isNew;

if (!package.name) {
  exports.name = basename.replace(/^node-/, '');
  isNew = true;
}

if (!package.version) {
  exports.version = '0.0.1';
}

if (isNew) {
  exports.private = prompt('private', 'yes', function(v) {
    v = v.toLowerCase()[0];
    return (v !== 'f' && v !== 'n') ? true : undefined;
  });
}

if (!package.description) {
  exports.description = prompt('description');
}

if (!package.author) {
  exports.author = 'Kengo Nakatsuka <kengo.nakatsuka@gmail.com>';
}

if (!package.bin && fs.existsSync('bin')) {
  package.bin = {};
}

if (!package.bugs) {
  exports.bugs = valueIfPublic({
    url: "https://github.com/nak2k/" + basename + "/issues",
  });
}

if (!package.dependencies) {
  exports.dependencies = {};
}

if (!package.devDependencies) {
  exports.devDependencies = {};
}

if (!package.homepage) {
  exports.homepage = valueIfPublic("https://github.com/nak2k/" + basename);
}

if (!package.keywords) {
  exports.keywords = [];
}

if (!package.license) {
  exports.license = 'MIT';
}

if (!package.main) {
  exports.main = 'lib';
}

if (!package.repository) {
  exports.repository = valueIfPublic({
    type: "git",
    url: "https://github.com/nak2k/" + basename + ".git",
  });
}

if (!package.scripts) {
  exports.scripts = {
  };
} else {
  exports.scripts = package.scripts;
}

if (!exports.scripts.test) {
  if (package.devDependencies && package.devDependencies.tape) {
    exports.scripts.test = 'tape test/*.js';
  }
}

exports.scripts = sortKeys(exports.scripts);

if (!package.files) {
  exports.files = [];
}

function valueIfPublic(v) {
  return function(cb) {
    if (this.exports.private || package.private) {
      cb();
    } else {
      cb(null, v);
    }
  };
}

function sortKeys(obj) {
  var result = {};
  Object.keys(obj).sort().forEach(function(name) {
    result[name] = obj[name];
  });
  return result;
}
