import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import startingPointNode from '../nodes/startingPoint';
import watchStoryNode from '../nodes/watchStory';
import watchVideoNode from '../nodes/watchVideo';
import newsFeedNode from '../nodes/newsfeed';
import createPostNode from '../nodes/createPost';
import postInteractNode from '../nodes/postInteract';
import deletePostNode from '../nodes/deletePost';
import viewNotiNode from '../nodes/viewNoti';
import sendMsgNode from '../nodes/sendMsg';
import replyMsgNode from '../nodes/replyMsg';
import addFriendNode from '../nodes/addFriend';
import cancelFriendNode from '../nodes/cancelFriend';
import joinGroupNode from '../nodes/joinGroup';
import leftGroupNode from '../nodes/leftGroup';
import inviteGroupNode from '../nodes/invite';
import likeCommentNode from '../nodes/likeComment';
import followerNode from '../nodes/follower';
import viewVideoNode from '../nodes/viewVideo';
import createPostGroupNode from '../nodes/createPostGroup';
const initialNodes = [
  {
    id: '1',
    type: 'startingPoint',
    data: { label: 'Starting Point' },
    position: { x: 250, y: 250 },
  },
];
const nodeTypes = {
  startingPoint: startingPointNode,
  watchStory: watchStoryNode,
  watchVideo: watchVideoNode,
  newsFeed: newsFeedNode,
  createPost: createPostNode,
  postInteract: postInteractNode,
  deletePost: deletePostNode,
  viewNoti: viewNotiNode,
  sendMsg: sendMsgNode,
  replyMsg: replyMsgNode,
  addFriend: addFriendNode,
  cancelFriend: cancelFriendNode,
  joinGroup: joinGroupNode,
  leftGroup: leftGroupNode,
  inviteGroup: inviteGroupNode,
  createPostGroup: createPostGroupNode,
  likeComment: likeCommentNode,
  follower: followerNode,
  viewVideo: viewVideoNode,
};
const nodeMessage = {
  watchStory: 'watchStory',
  watchVideo: 'watchVideo',
  newsFeed: 'newsFeed',
  createPost: 'createPost',
  postInteract: 'postInteract',
  deletePost: 'deletePost',
  viewNoti: 'viewNoti',
  sendMsg: 'sendMsg',
  replyMsg: 'replyMsg',
  addFriend: 'addFriend',
  cancelFriend: 'cancelFriend',
  joinGroup: 'joinGroup',
  leftGroup: 'leftGroup',
  inviteGroup: 'inviteGroup',
  createPostGroup: 'createPostGroup',
  likeComment: 'likeComment',
  follower: 'follower',
  viewVideo: 'viewVideo',
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ onMessageChange }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // click edit button in node (listen event from child node)
  const handleNodeButtonClick = (type) => {
    onMessageChange(type);
  };
  const handleDeleteNodeClick = (idToDelete) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== idToDelete));
    onMessageChange();
  };

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: '#333',
      },
      style: {
        strokeWidth: 2,
        stroke: '#333',
      },
    };

    setEdges((eds) => addEdge(newEdge, eds)), [];
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/202-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: `${type} node`,
          onButtonClick: () => handleNodeButtonClick(nodeMessage[type]),
          onDeleteNode: handleDeleteNodeClick,
        },
        dragging: false,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, handleNodeButtonClick],
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
