import { SuperClusterAlgorithm } from "@googlemaps/markerclusterer";

export const clusterOptions = {
  algorithm: new SuperClusterAlgorithm({
    radius: 60, // Rayon de clustering
    maxZoom: 16, // Zoom maximal où le clustering s'arrête
  }),
  onClusterClick: (event, cluster) => {
    const markers = cluster.markers;
    console.log("Cluster clicked", markers);
  },
};
