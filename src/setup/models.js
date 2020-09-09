const Glob = require('glob')

exports.loadModels = () => {
  const models = {}

  Glob.sync('../api/**/*.model.js', {
    realpath: true,
    cwd: __dirname,
  }).forEach((file) => {
    const model = require(file)

    const modelName = model.modelName
    models[modelName] = model
  })

  return models
}