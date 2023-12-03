//
//  ParentView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import SwiftUI

struct ParentView: View {
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @State var info: Student
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        //Display unique code here
        ScrollView(.vertical) {
            VStack() {
                Text(info.guardian.name)
                    .font(.largeTitle.bold())
                
                AsyncImage(url: URL(string: "https://barcodeapi.org/api/qr/https://us-central1-scooper-df18f.cloudfunctions.net/student/\(info.id)"))
                
                VStack {
                    Text("Code:")
                        .font(.title)
                        .fontWeight(.heavy)
                    
                    ForEach(vm.secureKey ?? [Key(key: "")]) { item in
                        
                        Text(item.key)
                            .font(.system(size: 80, weight: .semibold))
                            .fontWeight(.semibold)
                            .padding(30)
                            .frame(width: 350, height: 100, alignment: .center)
                            .foregroundColor(.gray)
                    }
                }
                .onAppear(perform: {
                    Task {
                        try await vm.getKey()
                    }
                })
                
                VStack(alignment: .center) {
                    Text("Vehicle: \(info.guardian.vehicle.licensePlate)")
                        .font(.title)
                        .fontWeight(.heavy)
                    HStack(spacing: 10) {
                        Text("Make: \(info.guardian.vehicle.make)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                        Text("Model: \(info.guardian.vehicle.model)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                    }
                    HStack(spacing: 20) {
                        Text("Color: \(info.guardian.vehicle.color)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                        Text("Year: \(info.guardian.vehicle.year)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                    }
                }
                .frame(width: 400)
            }
            .padding()
        }
        .navigationBarBackButtonHidden(true)
        Button {
            self.dismiss.callAsFunction()
        } label: {
            Text("Got It!")
        }
        .font(.headline)
        .frame(height: 55)
        .frame(minWidth: 360)
        .foregroundColor(.white)
        .background(Color("scooperGreen"))
        .clipShape(Rectangle())
        .cornerRadius(10)
    }
}
    
#Preview {
    ParentView(info: Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 0, grade: "", guardian: Parent(email: "john@test.com", name: "John Doe", phone: "534-563-5321", relation: "Father", vehicle: Vehicle(color: "White", year: "2022", model: "Civic", make: "Honda", licensePlate: "MFG5352"))))
}

extension String {
   subscript(_ characterIndex: Int) -> Character {
      return self[index(startIndex, offsetBy: characterIndex)]
   }
}
