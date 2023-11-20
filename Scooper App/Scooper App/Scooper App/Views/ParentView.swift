//
//  ParentView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import SwiftUI

struct ParentView: View {
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @State var info: User
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        //Display unique code here
        ScrollView(.vertical) {
            VStack(alignment: .leading) {
                Text(info.name)
                    .font(.largeTitle.bold())
                
                AsyncImage(url: URL(string: "https://barcodeapi.org/api/qr/\(info)"))
                
                Text("Code:")
                    .font(.title)
                    .fontWeight(.heavy)
                
                HStack {
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
                
                VStack(alignment: .leading) {
                    Text("Vehicle:")
                        .font(.title)
                        .fontWeight(.heavy)
                    HStack(spacing: 10) {
                        Text("Make:")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
//                        Text(info.vehicle.make)
                        Text("Model:")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
//                        Text(info.vehicle.model)
                        Spacer()
                    }
                    HStack(spacing: 20) {
                        Text("Color:")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
//                        Text(info.vehicle.color)
                        Text("Year:")
                            .font(.title3)
                            .foregroundStyle(Color.gray)
//                        Text(info.vehicle.year)
                        Spacer()
                    }
                }
                .frame(width: 400)
            }
            .padding(.leading)
        }
        .padding(.leading, 30)
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
    ParentView(info: User(id: "", phone: "555-555-5343", name: "John Doe", email: "john@test.com"))
}

extension String {
   subscript(_ characterIndex: Int) -> Character {
      return self[index(startIndex, offsetBy: characterIndex)]
   }
}
