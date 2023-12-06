import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "../../components/nodes/node";
import "./style.scss";
import watchStoryNode from "../../components/nodes/watchStory";
import watchVideoNode from "../../components/nodes/watchVideo";
import newsFeedNode from "../../components/nodes/newsfeed";
import createPostNode from "../../components/nodes/createPost";
import postInteractNode from "../../components/nodes/postInteract";
import deletePostNode from "../../components/nodes/deletePost";
import viewNotiNode from "../../components/nodes/viewNoti";
import sendMsgNode from "../../components/nodes/sendMsg";
import replyMsgNode from "../../components/nodes/replyMsg";
import addFriendNode from "../../components/nodes/addFriend";
import cancelFriendNode from "../../components/nodes/cancelFriend";

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    data: { label: "Starting Point" },
    position: { x: 250, y: 250 },
  },
];
const nodeTypes = {
  textUpdater: TextUpdaterNode,
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
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
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
            fitViewOptions={0.8}
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
