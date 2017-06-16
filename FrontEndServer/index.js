module.exports = (context, req, homepage) => {
  context.res = {
    body: homepage,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }
  context.done()
}
