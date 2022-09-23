import { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import Button from './button'

function getAccessToken () {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY5MzM1YmFDZkM1NzhkMDE4ODM3OWRkNmE0OTJhYUE0Mzk5MDM0QUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM4NDI3NzkyNDgsIm5hbWUiOiJQb2x5Z2xvdCB0ZXN0In0.HvGMkQB8UJfC3efS15W2cBEkjjYJ2kbBLNZkyKd4y2k"
  }
  
  function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
  }
  
  
  function getFiles () {
      const fileInput = document.querySelector('input[type="file"]')
      return fileInput.files
  }
  
  async function storeFiles (files) {
      const client = makeStorageClient()
      console.log(files)
      const cid = await client.put(files)
      console.log('stored files with cid:', cid)
      return cid
  }

const IPFSUploadFile = (props) => {

    const [fileInput, setFileInput] = useState({value: '', valid: false})
    const [isUploading, setIsUploading] = useState(false)
    const [buttonStyle , setButtonStyle] = useState({type: "primary", text: "Upload File"})

    const handleFile = (e) => {
        e.preventDefault()
        const value = getFiles()
        const valid = value ? true : false
        props.setCID('')
        setFileInput({value: value, valid: valid})
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if(fileInput.valid && !isUploading){
            setIsUploading(true)
            storeFiles(fileInput.value)
            .then(cid => {
                props.setCID(cid)
                setIsUploading(false)
            })
        }
    }

    useEffect(() => {
        if(isUploading){
            setButtonStyle({type: "", text: "Uploading..."})
        } else {
            setButtonStyle({type: "primary", text: "Upload File"})
        }
    }, [isUploading])


    return (
        <div className="my-3 w-2/3">
            <label htmlFor="file" className="text-md">{props.label}</label>
            <div className="mb-2 flex items-center justify-between">
                <input type="file" onInput={handleFile} name="file" className="border bg-white block w-2/3 p-2 shadow-inner"/>
                <span onClick={handleUpload}>
                    <span className={isUploading ? "animate-pulse" : ""}>
                        <Button type={buttonStyle.type} content={buttonStyle.text}/>
                    </span>
                </span>
            </div>
            {
                !fileInput.valid
                ? <span className="text-red-500 text-md mt-2 text-center">Select file to upload</span>
                : ''
            }
            {
                !props.cid && fileInput.valid
                ? <span className="text-red-500 text-md mt-2 text-center">You must upload file</span>
                : props.cid && fileInput.valid 
                ? <span className="text-green-600 text-md mt-2 text-center">File upload succesfully</span>
                : ''
            }
        </div>
    )
}

export default IPFSUploadFile