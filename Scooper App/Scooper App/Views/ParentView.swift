//
//  ParentView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import SwiftUI

struct ParentView: View {
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @State var info: Vehicle
    @State var id: String?
    @State var guardianName: String?
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        //Display unique code here
        ScrollView(.vertical) {
            VStack() {
                Text(guardianName ?? "")
                    .font(.largeTitle.bold())
                
                AsyncImage(url: URL(string: "https://barcodeapi.org/api/qr/https://us-central1-scooper-df18f.cloudfunctions.net/student/\(id ?? "")"))
                
                VStack {
                    Text("Code:")
                        .font(.title)
                        .fontWeight(.heavy)
                    
                    ForEach(vm.secureKey ?? [Key(key: "")]) { item in
                        
                        VStack {
                            Text(item.key)
                                .font(.system(size: 80, weight: .semibold))
                                .fontWeight(.semibold)
                                .padding(30)
                                .frame(width: 350, height: 100, alignment: .center)
                                .foregroundColor(.gray)
                        }
                    }
                }
                .onAppear(perform: {
                    Task {
                        try await vm.getKey(id: id ?? "")
                    }
                })
                
                VStack(alignment: .center) {
                    Text("Vehicle: \(info.licensePlate)")
                        .font(.title)
                        .fontWeight(.heavy)
                    HStack(spacing: 10) {
                        Text("Make: \(info.make)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                        Text("Model: \(info.model)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                    }
                    HStack(spacing: 20) {
                        Text("Color: \(info.color)")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
                        Text("Year: \(info.year)")
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
    ParentView(info: Vehicle(color: "Black", year: "1993", model: "Civic", make: "Honda", licensePlate: "EXS1923"), guardianName: "John Doe")
}

extension String {
   subscript(_ characterIndex: Int) -> Character {
      return self[index(startIndex, offsetBy: characterIndex)]
   }
}
