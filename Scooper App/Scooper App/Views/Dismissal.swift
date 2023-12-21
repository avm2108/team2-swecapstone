//
//  Dismissal.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import SwiftUI

struct Dismissal: View {
    @State var grade: String
    @State var name: String
    @State var id: String
    @State private var parentArrival: Bool = false
    @State private var queueStatus: Queue = .waiting
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @Environment(\.dismiss) var dismiss
    @State private var isPresented = false
    @State var position: Int
    @State var status: Bool
    
    enum Queue {
        case waiting
        case preparing
        case dispatching
    }
    
    var body: some View {
        
        VStack {
            ZStack {
                Circle()
                    .foregroundColor(.blue.opacity(0.6))
                    .frame(width: 200, height: 200)
                Text(name.first?.description ?? "")
                    .font(.system(size: 90))
                    .foregroundStyle(Color.white)
            }
            
            
            Text(name)
                .font(.largeTitle.bold())
            switch queueStatus {
            case .waiting:
                Text("waiting...")
                    .font(.caption)
                    .foregroundStyle(.gray.opacity(0.6))
                    .padding(.bottom)
            case .preparing:
                Text("preparing...")
                    .font(.caption)
                    .foregroundStyle(.gray.opacity(0.6))
                    .padding(.bottom)
            case .dispatching:
                Text("dispatching...")
                    .font(.caption)
                    .foregroundStyle(.gray.opacity(0.6))
                    .padding(.bottom)
            }
            
            if (position != 1000) {
//                Text("Zone: ")
//                    .font(.title)
                
                Text("Slot: \(position)")
                    .font(.title)
            }
        }
        .onAppear(perform: {
            if (position != 1000) {
                queueStatus = .preparing
            } else if (position == 1000 && !status) {
                queueStatus = .dispatching
            }
        })
        .alert("Dismissal failed", isPresented: $isPresented, actions: {
            Button("OK") {
                isPresented = false
            }
        }, message: {
            Text("Please try again.")
        })
        Spacer()
        
        Button {
            vm.dismiss(status: false, id: id, position: 1000)
            
            Task {
                do {
                    try await vm.removeFromQueue()
                } catch {
                    isPresented = true
                    print(error)
                }
            }
            self.dismiss.callAsFunction()
        } label: {
            Text("Dismiss")
        }
        .font(.headline)
        .frame(height: 55)
        .frame(minWidth: 360)
        .foregroundColor(.white)
        .background(Color.red)
        .clipShape(Rectangle())
        .cornerRadius(10)
        .padding()
    }
}


#Preview {
    Dismissal(grade: "", name: "John Doe", id: "", position: 1, status: .random())
}
