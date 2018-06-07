# eboard
An blackboard implementation based on html canvas.


For developer:
1. Checkout this project to local.
2. Run npm install
3. Checkout https://github.com/codyysh/DefinitelyTyped/tree/master/types/fabric to local(This project is forked from https://github.com/DefinitelyTyped/DefinitelyTyped and add some necessary declarations for fabric.)
4. copy fabric ts declration files from  https://github.com/codyysh/DefinitelyTyped/tree/master/types/fabric into node_modules/@type/fabric directory of this project, it will overwrite standard fabric ts declaration.


Plan:
1. support custom shapes（done, liheeng, 20180607)

2. redo、undo (done, liheeng, 20180607)

3. Zoom in/out (done, liheeng, 20180607)

4. document as image view plugin

5. integrate message event

6. pdf view plugin
https://github.com/mozilla/pdf.js/ https://github.com/erikras/react-pdfjs
https://github.com/wojtekmaj/react-pdf

7. equation editing plugin
  https://codepen.io/tswone/pen/ozYxzw
  html2canvas
  
8. chart plugin

9. Support more shapes.

10. More undo/redo actions.

