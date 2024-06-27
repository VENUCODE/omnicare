import React from "react";
import ModelLoad from "../../components/ModelLoad";
import { RGBA_ASTC_10x10_Format } from "three";
const Home = () => {
  return (
    <div className="row">
      <div className="col-md-6 model-bg">
        <ModelLoad path="/models/steth/scene.gltf" />
      </div>
      <div className="col-md-6">
        <h1>Steth </h1>
      </div>
      <div className="col-md-6">
        <h1>Brain tumor prediction</h1>
      </div>
      <div className="col-md-6 model-bg">
        <ModelLoad path="/models/human_brain/scene.gltf" scale={4} />
      </div>
      <div className="col-md-6 model-bg">
        <ModelLoad path="/models/realistic_human_heart/scene.gltf" scale={3} />
      </div>
      <div className="col-md-6">
        <h1>Brain tumor prediction</h1>
      </div>
      <div className="col-md-6">
        <h1>Brain tumor prediction</h1>
      </div>

      <div className="col-md-6 model-bg">
        <ModelLoad path="/models/tropical_plant_2/scene.gltf" scale={2} />
      </div>
      <div className="col-md-6 model-bg bg-danger">
        <ModelLoad path="/models/animal_cell/scene.gltf" scale={1} />
      </div>
      <div className="col-md-6">
        <h1>Brain tumor prediction</h1>
      </div>
      <div className="col-md-6 bg-white">
        <ModelLoad path="/models/cosmic/scene.gltf" scale={1} />
      </div>
      <div className="col-md-6 bg-white">
        <h1>Brain tumor prediction</h1>
      </div>
      <div className="col-md-6 bg-white">
        <ModelLoad path="/models/space/scene.gltf" scale={10} />
      </div>
    </div>
  );
};

export default Home;
