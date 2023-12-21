//
//  SettingsView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 12/7/23.
//

import SwiftUI

struct SettingsView: View {
    @State private var position: String = ""
    @StateObject private var vm = ScooperViewModel()
    @State private var isPresented = false
    
    var body: some View {
        VStack {
            TextField("Enter number of positions", text: $position)
                .padding()
                .background(.gray.opacity(0.3))
                .clipShape(RoundedRectangle(cornerSize: CGSize(width: 10, height: 10)))
            
            Spacer()
            
            Button {
                Task {
                    do {
                        try await vm.updateQueuePositions(to: position)
                        isPresented = true
                    } catch {
                        print(error)
                    }
                }
            } label: {
                Text("Set")
            }
            .font(.headline)
            .frame(height: 55)
            .frame(minWidth: 360)
            .foregroundColor(.white)
            .background(.red)
            .clipShape(Rectangle())
            .cornerRadius(10)
            .padding()
        }
        .alert("Queue Size", isPresented: $isPresented, actions: {
            Button("OK") {
                position = ""
                isPresented = false
            }
        }, message: {
            Text("You have set the queue positions to \(position).")
        })
        .padding()
    }
}

#Preview {
    SettingsView()
}
