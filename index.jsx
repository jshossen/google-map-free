import React, { useEffect, useRef } from "react";
import "./style.css";

const GoogleMapFree = (props) => {
  const mapWrapper = useRef();
  useEffect(() => {
    mapWrapper.current.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.onload = function () {
      var doc = iframe.contentDocument;

      iframe.contentWindow.showNewMap = function () {
        var mapContainer = doc.createElement("div");
        mapContainer.setAttribute("style", "width: 100%; height: 500px");
        doc.body.appendChild(mapContainer);

        var mapOptions = {
          center: new this.google.maps.LatLng(props.lat, props.lng),
          zoom: props.zoom,
          mapTypeId: this.google.maps.MapTypeId.ROADMAP,
        };

        var map = new this.google.maps.Map(mapContainer, mapOptions);
      };

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&" + "callback=showNewMap";
      iframe.contentDocument.getElementsByTagName("head")[0].appendChild(script);
      let style = document.createElement("style");
      style.type = "text/css";

      console.log(style);

      style.innerHTML = "html{overflow: hidden;} body{margin: 0;}";

      iframe.contentDocument.getElementsByTagName("head")[0].appendChild(style);
    };

    mapWrapper.current.appendChild(iframe);
  }, [props.lat, props.lng]);
  return <div className="google-map-free" ref={mapWrapper}></div>;
};

module.exports.GoogleMapFree = GoogleMapFree;
