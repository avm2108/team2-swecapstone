//
//  ScoopTeamProfileView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/1/23.
//

import SwiftUI

struct ScoopTeamProfileView: View {
    @StateObject private var vm = ScooperViewModel()
    @State var id: String?
    @State var name: String
    @State var relation: String
    @State var phone: String
    @State var vehicle: Vehicle
    @Environment(\.dismiss) var dismiss
    @State private var isPresented = false
    @State var scoopInfo: [String]
    
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
            Text(relation)
                .font(.title2)
                .foregroundStyle(.gray.opacity(0.7))
                .padding(.bottom)
            
            VStack {
                Text("Vehicle: \(vehicle.licensePlate)")
                    .font(.title.bold())
                
                HStack {
                    Text("Model: \(vehicle.model)")
                        .font(.title3)
                    
                    Text("Make: \(vehicle.make)")
                        .font(.title3)
                }
                
                HStack {
                    Text("Color: \(vehicle.color)")
                        .font(.title3)
                    
                    Text("Year: \(vehicle.year)")
                        .font(.title3)
                }
            }
        }
        .padding()
        .alert("Scooper", isPresented: $isPresented, actions: {
            Button("OK") {
                isPresented = false
                self.dismiss.callAsFunction()
            }
        }, message: {
                Text("\(name) is set as your scooper for \(scoopInfo[0]) at \(scoopInfo[1]). Note: \(scoopInfo[2])")
        })
        
        Spacer()
        
        Button {
            Task {
                try await vm.updateScooper(id: self.id ?? "", scooper: self.name)
            }
            isPresented = true
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
    }
}

#Preview {
    ScoopTeamProfileView(name: "John", relation: "Dad", phone: "404-534-5334", vehicle: Vehicle(color: "Black", year: "2013", model: "Accord", make: "Honda", licensePlate: "OCP4246"), scoopInfo: ["", "", ""])
}
