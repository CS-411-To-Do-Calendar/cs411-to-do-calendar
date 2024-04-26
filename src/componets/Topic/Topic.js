import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { removeTopic, removeSubTopic } from '../../firestore/firebaseTodo';

import './Topic.css'

function Topic({ objCol, fetchTodoList }) {
    const random = Math.floor(Math.random() * 15);
    const colorPalette = [
        "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#DC143C", "#B22222", "#8B0000", "#FF0000"
    ];
    const { user } = UserAuth();

    const handleRemoveTopic = async () => {
        if (user && user.uid && objCol.topic) {
            await removeTopic(user.uid, objCol.topic);
            fetchTodoList();  // Trigger refresh of todo list in parent component
        }
    };

    const handleRemoveSubTopic = async (subTopic) => {
        if (user && user.uid && objCol.topic && subTopic) {
            await removeSubTopic(user.uid, objCol.topic, subTopic);
            fetchTodoList();  // Trigger refresh of todo list in parent component
        }
    };

    return (
        <div className='topic-container'>
            <div className='topic-title-container' onClick={handleRemoveTopic}>
                <div className='topic-title' style={{'color' : colorPalette[random]}}>
                    {objCol.topic}
                </div>
            </div>
            <div className='topic-subtopic-container'>
                {objCol.subTopic.map((subTopic) =>
                    <div key={subTopic.toString()} style={{'border': `2px solid ${colorPalette[random]}`}} className='topic-subtopic-item' onClick={() => handleRemoveSubTopic(subTopic)}>
                        {subTopic}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Topic;
