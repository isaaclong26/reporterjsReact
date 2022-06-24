import React,{useEffect, useState} from "react";
import * as tf from '@tensorflow/tfjs';
import padSequences from "./helper";


const CommentsDiv = ({data})=>{
    let comments = data;


    // copied code 
    const url = {

        model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
        metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
    };
    
    const OOV_INDEX = 2;
    
    const [metadata, setMetadata] = useState();
    const [model, setModel] = useState();
    const [testText, setText] = useState("");
    const [testScore, setScore] = useState("");
    const [trimedText, setTrim] = useState("")
    const [seqText, setSeq] = useState("")
    const [padText, setPad] = useState("")
    const [inputText, setInput] = useState("")
    
    
    async function loadModel(url) {
      try {
        const model = await tf.loadLayersModel(url.model);
        setModel(model);
      } catch (err) {
        console.log(err);
      }
    }
    
    async function loadMetadata(url) {
      try {
        const metadataJson = await fetch(url.metadata);
        const metadata = await metadataJson.json();
        setMetadata(metadata);
      } catch (err) {
        console.log(err);
      }
    }
    
    
    const getSentimentScore =(text) => {
      console.log(text)
      const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
      setTrim(inputText)
    //   console.log(inputText)
      const sequence = inputText.map(word => {
        let wordIndex = metadata.word_index[word] + metadata.index_from;
        if (wordIndex > metadata.vocabulary_size) {
          wordIndex = OOV_INDEX;
        }
        return wordIndex;
      });
      setSeq(sequence)
    //   console.log(sequence)
      // Perform truncation and padding.
      const paddedSequence = padSequences([sequence], metadata.max_len);
    //   console.log(metadata.max_len)
      setPad(paddedSequence)
    
      const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
      console.log(input)
      setInput(input)
      const predictOut = model.predict(input);
      const score = predictOut.dataSync()[0];
      predictOut.dispose();
      setScore(score)  
      console.log(score)
      return score;
    }
    
    
    useEffect(()=>{
      tf.ready().then(
        ()=>{
          loadModel(url)
          loadMetadata(url)
        }
      );
    
    },[])
    // end 
    const getScores = async()=>{ 
           var scores = []

        for(let x in comments){
            let comment = comments[x];
            let score = getSentimentScore(comment)
            scores.push(score)
        }
        console.log(scores)
    }   
    


    return(
        <div className="container">

            <div className="row">
                <h1 className="text-center">All Comments</h1>
            </div>
            
            <div className="row">
            <button onClick={getScores}>Press Me</button>

            </div>

        </div>

    
    )
}


export default CommentsDiv;