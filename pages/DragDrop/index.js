/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";

export default class UploadComponent extends Component {
  state = {};

  componentDidMount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach(eventName => {
      dropArea.addEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, this.unHightLight, false);
    });

    dropArea.addEventListener("drop", this.handleDrop, false);
  }
  componentWillUnmount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      dropArea.removeEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach(eventName => {
      dropArea.removeEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      dropArea.removeEventListener(eventName, this.unHightLight, false);
    });

    dropArea.removeEventListener("drop", this.handleDrop, false);
  }
  preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#e9e9e9";
      ele.style.border = "2px dotted #999";
    }
  };

  unHightLight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#f6f6f6";
      ele.style.border = "unset";
    }
  };

  handleDrop = e => {
    const dt = e.dataTransfer;
    const { files } = dt;
    this.handleFiles(files);
  };

  handleFiles = files => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function() {
      let img = document.createElement("img");
      img.src = reader.result;
      img.className = "image";
      document.getElementById("drop-area").appendChild(img);
    };
  };

  render() {
    return (
      <div id="drop-area">
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          onChange={e => {
            this.handleFiles(e.target.files);
          }}
        />
        <label className="upload-label" htmlFor="fileElem">
          <div className="upload-text">Drag Image here or click to upload</div>
        </label>
        <div className="image" />
        <style jsx>
            {
                `
                  #drop-area {
                    position: relative;
                  }
                  
                  #fileElem {
                    display: none;
                  }
                  
                  .upload-label {
                    padding: 10px;
                    cursor: pointer;
                    border-radius: 6px;
                    min-width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                    height: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f6f6f6;
                  }
                  .upload-label:hover {
                    background-color: #e9e9e9;
                  }
                  
                  .upload-label:active {
                    background-color: #f6f6f6;
                  }
                  
                  .upload-text {
                    color: #666;
                    user-select: none;
                  }
                  
                  .image {
                    min-width: 100%;
                    max-width: 100%;
                    height: 140px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                  }
                  

                `
            }
        </style>
      </div>
    );
  }
}
