# -*- coding: utf-8 -*-
"""
    pygments.styles.skin
    ~~~~~~~~~~~~~~~~~~

    Simple style with MS Visual Studio colors.

    :copyright: Copyright 2006-2017 by the Pygments team, see AUTHORS.
    :license: BSD, see LICENSE for details.
"""

from pygments.style import Style
from pygments.token import Keyword, Name, Comment, String, Error, \
     Operator, Generic


class SkinStyle(Style):

    background_color = "#ffffff"
    default_style = ""

    styles = {
        Comment:                   "#008000",
        Comment.Preproc:           "#0000ff",
        Keyword:                   "#C8B7C7",
        Operator.Word:             "#0000ff",
        Keyword.Type:              "#2b91af",
        Name.Class:                "#2b91af",
        String:                    "#D6B085",

        Generic.Heading:           "bold",
        Generic.Subheading:        "bold",
        Generic.Emph:              "italic",
        Generic.Strong:            "bold",
        Generic.Prompt:            "bold",

        Error:                     "border:#FF0000"
    }
