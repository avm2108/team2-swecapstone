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
            Text("Zone: ")
                .font(.title)
            Text("Slot: ")
                .font(.title)
        }
        Spacer()
        Button {
            vm.dismiss(status: false, id: id, position: 0)
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
    Dismissal(grade: "", name: "John Doe", id: "")
}
