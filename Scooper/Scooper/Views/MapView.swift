//
//  MapView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/19/23.
//

import SwiftUI
import MapKit

struct MapView: View {
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(
            latitude: 34.0020952,
            longitude: -84.6569194),
        span: MKCoordinateSpan(
            latitudeDelta: 0.004,
            longitudeDelta: 0.001)
    )
    
    var body: some View {
        VStack {
            Map(coordinateRegion: $region, showsUserLocation: true)
                .ignoresSafeArea()
                .onAppear {
                }
        }
    }
}

#Preview {
    MapView()
}
