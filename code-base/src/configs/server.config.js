var server={
version:'1.0.0.1',
getVersion:function () {
    return this.version;
  },
getExpress:function()
{
  return require('express');
}
};

module.exports = server;