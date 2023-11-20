//
//  MapView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI
import MapKit

struct MapView: View {
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(
            latitude: 33.962939,
            longitude: -84.236593),
        span: MKCoordinateSpan(
            latitudeDelta: 0.003,
            longitudeDelta: 0.001)
    )
    
    @State private var latitude = 0.0
    @State private var longitude = 0.0
    @State private var isPresented = false
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            Map(coordinateRegion: $region,
                interactionModes: .all,
                showsUserLocation: true)
            .ignoresSafeArea()
            .ignoresSafeArea()
        }
    }
}

#Preview {
    MapView()
}
