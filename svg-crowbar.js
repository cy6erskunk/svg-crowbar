  const doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
  var prefix = {
    xmlns: "http://www.w3.org/2000/xmlns/",
    xlink: "http://www.w3.org/1999/xlink",
    svg: "http://www.w3.org/2000/svg"
  };
  
  const emptySvg = window.document.createElementNS(prefix.svg, 'svg');
  const body = document.body;
  body.appendChild(emptySvg);
  const emptySvgDeclarationComputed = getComputedStyle(emptySvg);

  function getSource(svg, emptySvgDeclarationComputed) {
    const _svg = svg.cloneNode(true);
    svg.setAttribute("version", "1.1");
    // removing attributes so they aren't doubled up
    svg.removeAttribute("xmlns");
    svg.removeAttribute("xlink");

    // These are needed for the svg
    if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
      svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
    }

    if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
      svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
    }

    setInlineStyles(svg, emptySvgDeclarationComputed);

    var source = (new XMLSerializer()).serializeToString(svg);
    var rect = svg.getBoundingClientRect();

    const result = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      class: svg.getAttribute("class"),
      id: svg.getAttribute("id"),
      name: svg.getAttribute("name"),
      childElementCount: svg.childElementCount,
      source: [doctype + source]
    };

    svg = _svg;
    return result;
  }

  function download(source) {
    var filename = getFilename(source);

    var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

    var a = document.createElement("a");
    body.appendChild(a);
    a.setAttribute("class", "svg-crowbar");
    a.setAttribute("download", filename + ".svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();

    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 10);
  }


  function setInlineStyles(svg, emptySvgDeclarationComputed) {

    function explicitlySetStyle (element) {
      var cSSStyleDeclarationComputed = getComputedStyle(element);
      var i, len, key, value;
      var computedStyleStr = "";
      for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
        key=cSSStyleDeclarationComputed[i];
        value=cSSStyleDeclarationComputed.getPropertyValue(key);
        if (value!==emptySvgDeclarationComputed.getPropertyValue(key)) {
          computedStyleStr+=key+":"+value+";";
        }
      }
      element.setAttribute('style', computedStyleStr);
    }
    function traverse(obj){
      var tree = [];
      tree.push(obj);
      visit(obj);
      function visit(node) {
        if (node && node.hasChildNodes()) {
          var child = node.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
              tree.push(child);
              visit(child);
            }
            child = child.nextSibling;
          }
        }
      }
      return tree;
    }
    // hardcode computed css styles inside svg
    var allElements = traverse(svg);
    var i = allElements.length;
    while (i--){
      explicitlySetStyle(allElements[i]);
    }
  }

  function getFilename(source) {
    var filename = "untitled";

    if (source.id) {
      filename = source.id;
    } else if (source.class) {
      filename = source.class;
    } else if (window.document.title) {
      filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }
    return filename;
  }
  
  function downloadPNG(source) {
    var filename = getFilename(source);

    var canvas = document.createElement("canvas");
    body.appendChild(canvas);
    canvas.setAttribute("id", "svg-image");
    canvas.setAttribute("width", source.width);
    canvas.setAttribute("height", source.height);
    canvas.style.display = "none";

    var context = canvas.getContext("2d");
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(source.source);

    var image = new Image;
    image.src = imgsrc;
    image.onload = function() {
      context.drawImage(image, 0, 0);
      var canvasdata = canvas.toDataURL("image/png");

      var a = document.createElement("a");
      a.download = filename+".png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  }

export const downloadPng = svgElement => downloadPNG(getSource(svgElement, emptySvgDeclarationComputed));
const downloadSvg = svgElement => download(getSource(svgElement, emptySvgDeclarationComputed));
export default downloadSvg;