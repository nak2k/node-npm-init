const fs = require('fs');
const { sortScripts } = require('scripts-sort');

const isNew = !package.name;

if (!package.name) {
  exports.name = basename.replace(/^node-/, '');
}

if (!package.version) {
  exports.version = '0.1.0';
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

if (!exports.private && !exports.scripts.prepublishOnly && exports.scripts.test) {
  exports.scripts.prepublishOnly = 'npm test';
}

if (!exports.private && !exports.scripts.postpublish) {
  exports.scripts.postpublish = 'npm-sns';
}

exports.scripts = sortScripts(exports.scripts);

if (!package.files) {
  exports.files = [
    'README.md',
    'lib/',
  ];
} else {
  exports.files = package.files.sort();
}
