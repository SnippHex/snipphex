from pygments.formatters.html import HtmlFormatter

class CustomFormatter(HtmlFormatter):
  def wrap(self, source, outfile):
    return self._wrap_code(source)

  def _wrap_code(self, source):
    yield 0, '<pre class="code-container line-numbers s_h"><code class="code">'
    lines = 0
    for i, t in source:
      lines += 1
      yield i, t
    yield 0, '</code><span aria-hidden="true" class="line-numbers-rows">'+(lines * '<span></span>')+'</span></pre>'
