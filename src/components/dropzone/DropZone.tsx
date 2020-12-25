import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import "./DropZone.scss"

export const DropZone = () => {
    const [dragStatus, changeStatus] = useState(false);
    const [filesCount, setCount] = useState(0);
    const [progress, changeProgress] = useState(0);
    const [rejectedCount, addRejected] = useState(0);
    const [uploadStatus, changeUploadStatus] = useState("none");

    const formatChecker = (name: string) => {
        const format = /(\w+)$/
        const extension: RegExpMatchArray | null = name.match(format);
        return extension && (extension[0] === "txt" || extension[0] === "csv" || extension[0] === "pdf" || extension[0] === "jpg" || extension[0] === "png" || extension[0] === "tif" || extension[0] === "eml" || extension[0] === "doc" || extension[0] === "xls" || extension[0] === "xlsx") ? true : false;
    }

    const countPersents = () => {
        return filesCount !== 0 && (progress / filesCount) * 100;
    }

    return <div className="drop-zone">
        <div
            className={!!dragStatus ? 'drop-section dragged' : 'drop-section not-dragged'}
        >
            <p>Перетащите файлы для загрузки</p>
            <Dropzone onDrop={async (acceptedFiles) => {
                changeUploadStatus("loading")
                changeProgress(0);
                setCount(acceptedFiles.length);
                acceptedFiles.forEach(async (element, index) => {
                    const file = element;
                    if (!formatChecker(file.name)) {
                        addRejected((state): number => {
                            return state + 1
                        })
                        setCount((state: number) => {
                            return state - 1
                        })
                        return;
                    }
                    const formData = new FormData();
                    console.log(file)
                    formData.append('file', file);
                    const res = await fetch('http://localhost:8800/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    if (res.status === 200) {
                        changeProgress((state: number) => {
                            return state + 1
                        })
                        if (index === acceptedFiles.length - 1) {
                            changeUploadStatus("success");
                        }
                        return;
                    }
                });
            }}
            >
                {({ getRootProps, getInputProps }) => {
                    const options = { ...getInputProps() }
                    options.accept = ".txt, .csv"
                    return <>
                        <section
                            onDragLeave={(e) => {
                                changeStatus(false);
                            }}
                            onDragEnter={(e) => {
                                changeStatus(true);
                            }}
                            onDropCapture={() => {
                                changeStatus(false);
                            }}
                            style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0" }}
                        >
                            <div
                                style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0" }} {...getRootProps()}>
                                <input type="file" style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0" }} {...options}
                                />
                            </div>
                        </section>
                    </>
                }
                }
            </Dropzone>
        </div>
        <div className="upload-status" style={{ display: uploadStatus === "none" ? "none" : "block" }}>{uploadStatus === "loading" ? "Загрузка" : "Загружено"}</div>
        <div className="progress-bar">
            <div style={{ width: `${countPersents()}%` }} className="progress"></div>
        </div>
        <div className="files-counter">{progress} / {filesCount}</div>
        <div className="files-rejected">Отклонено: {rejectedCount}</div>
    </div >
}
