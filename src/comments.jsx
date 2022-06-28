import React,{useEffect, useState} from "react";
import * as tf from '@tensorflow/tfjs';
import padSequences from "./helper";
import styled from "styled-components"



const CAS = styled.div`
  padding: 20px;
  margin: 10px;
  background-color:#f0f0f0;
`



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
    const [cAS, setCAS] = useState([""])
    
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
      setInput(input)
      const predictOut = model.predict(input);
      const score = predictOut.dataSync()[0];
      predictOut.dispose();
      setScore(score)  
      return score;
    }


    const getSentimentScoreLong =(text) => {
      let newText = text.replace(/\./g," .");
      let list = newText.split('.')
      let totScore = 0;
      let totIndex = 0; 
      for(let x in list){
        let text = list[x]
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
      setInput(input)
      const predictOut = model.predict(input);
      const score = predictOut.dataSync()[0];
      predictOut.dispose();
      setScore(score)  
      totScore += score;
      totIndex ++;

    }
    let ave = totScore/totIndex;
    return ave

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
          let score
        for(let x in comments){
            let comment = comments[x];
            let list = comment.split(" ").length
            if(list < 11){
             score = getSentimentScore(comment)
            }
            else{
               score = getSentimentScoreLong(comment)
            }

            let ots = {text: comment, set: score};

            scores.push(ots)
        }
          setCAS(scores)
    }   
    


    return(
        <div className="container">

            <div className="row">
                <h1 className="text-center">All Comments(experimental)</h1>
            </div>
            
            <div className="row">
            <button className="btn" onClick={getScores}>Press Me</button>

            {cAS.map(x =>
            <CAS className="row">
                <CAS className="col-lg-12">{x.text}</CAS>
                <CAS className="col-lg-12">{x.set}</CAS>

                </CAS>

              )}


            </div>

        </div>

    
    )
}


export default CommentsDiv;