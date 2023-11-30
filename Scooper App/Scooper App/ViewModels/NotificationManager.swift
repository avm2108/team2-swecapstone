//
//  NotificationManager.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/21/23.
//

import Foundation
import UserNotifications
import SwiftUI
import Firebase

@MainActor
class NotificationManager: ObservableObject {
    @Published var permissions = false
    
    func getStatus() async {
        let status = await UNUserNotificationCenter.current().notificationSettings()
        
        switch status.authorizationStatus {
        case.authorized, .provisional, .ephemeral:
            self.permissions = true
        default:
            self.permissions = false
        }
    }
    
    func requestPermissions() async {
        do {
            let options: UNAuthorizationOptions = [.alert, .badge, .sound]
            self.permissions = try await UNUserNotificationCenter.current().requestAuthorization(options: options)
            
        } catch {
            print(error.localizedDescription)
        }
    }
}
