//
//  MapViewModel.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/19/23.
//

import Foundation
import CoreLocation
import MapKit
import SwiftUI

final class MapViewModel: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var authorizationStatus: CLAuthorizationStatus = .notDetermined
    private let locationManager = CLLocationManager()
    @Published var coordinates: CLLocationCoordinate2D?
    @Published var hasArrived: Bool = false
    
    let shared = ScooperViewModel()
    
    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
        locationManager.requestWhenInUseAuthorization()
        locationManager.allowsBackgroundLocationUpdates = true
        locationManager.startUpdatingLocation()
        
        monitorRegionAtLocation(center: CLLocationCoordinate2D(latitude: 37.33436, longitude: -122.041445), identifier: "Bullard Elementary")
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        
        let status = locationManager.authorizationStatus
        
        switch status {
        case .notDetermined:
            print("notDetermined")
        case .restricted:
            print("restricted")
        case .denied:
            print("denied")
        case .authorizedAlways:
            print ("authorizedAlways")
        case .authorizedWhenInUse:
            print("authorizedWhenInUse")
            locationManager.requestAlwaysAuthorization()
        default:
            break
        }
    }
    
    func requestPermission() {
        locationManager.requestWhenInUseAuthorization()
    }
    
    func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
        guard let region = region as? CLCircularRegion else { return }
        self.hasArrived = true
        
        Task {
            try await shared.addToQueue(id: "5NlmPhRjYs34QVz22Avs")
        }
        
        print("Entered: \(region.identifier)")
        print(locationManager.monitoredRegions)
    }
    
    func locationManager(_ manager: CLLocationManager, didExitRegion region: CLRegion) {
        self.hasArrived = false
        print("Exited: \(region.identifier)")
    }
    
    func monitorRegionAtLocation(center: CLLocationCoordinate2D, identifier: String) {
        guard CLLocationManager.isMonitoringAvailable(for: CLCircularRegion.self) else { return }
        
        let regionCoordinate: CLLocationCoordinate2D = CLLocationCoordinate2D(latitude: center.latitude, longitude: center.longitude)
        
        let geofenceRegion: CLCircularRegion = CLCircularRegion(center: regionCoordinate, radius: 100, identifier: identifier)
        
        geofenceRegion.notifyOnEntry = true
        geofenceRegion.notifyOnExit = true
        
        locationManager.startMonitoring(for: geofenceRegion)
    }
    
    deinit {
        locationManager.stopUpdatingLocation()
    }
}
