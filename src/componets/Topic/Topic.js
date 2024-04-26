import React from 'react'
import './Topic.css'

function Topic({objCol}) {
    const random = Math.floor(Math.random() * 15);
    console.log(random);
    const colorPalette = [
        "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#DC143C", "#B22222", "#8B0000", "#FF0000"
    ]
return (
    <div className='topic-container'>
        <div className='topic-title-container'>
            <div className='topic-title' style={{'color' : colorPalette[random]}}>
                {objCol.topic}
            </div>
        </div>
        <div className='topic-subtopic-container'>
            {objCol.subTopic.map((subTopic) =>
                <div key={subTopic.toString()} style={{'border': `2px solid ${colorPalette[random]}`}} className='topic-subtopic-item'>{subTopic}</div>
            )}
        </div>
    </div>
  );
}

export default Topic
// make a fake obj of topic title and sub-topic (array)
// const obj = {
//     topic: "Today's goal",
//     subTopic: ['Wire Frame Finish', 'Finish 411 project!!!']
// }
//https://legacy.reactjs.org/docs/lists-and-keys.html