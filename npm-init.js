const fs = require('fs');

const isNew = !package.name;

if (!package.name) {
  exports.name = basename.replace(/^node-/, '');
}

if (!package.version) {
  exports.version = '0.0.1';
}

if (isNew) {
  exports.private = prompt('private', 'yes', v => {
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
  exports.bugs = {
    url: `https://github.com/nak2k/${basename}/issues`,
  };
}

if (!package.dependencies) {
  exports.dependencies = {};
}

if (!package.devDependencies) {
  exports.devDependencies = {};
}

if (!package.homepage) {
  exports.homepage = `https://github.com/nak2k/${basename}`;
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
  exports.repository = {
    type: 'git',
    url: `https://github.com/nak2k/${basename}.git`,
  };
}

exports.scripts = package.scripts || {};

if (!exports.scripts.test) {
  if (package.devDependencies && package.devDependencies.tape) {
    exports.scripts.test = 'tape test/*.js';
  }
}

exports.scripts = sortKeys(exports.scripts);

if (!package.files) {
  package.files = [
    'README.md',
    'lib/',
  ];
}

exports.files = package.files.sort();

function sortKeys(obj) {
  return Object.keys(obj).sort().reduce((result, name) => {
    result[name] = obj[name];
    return result;
  }, {});
}
