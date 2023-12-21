//
//  FamilyView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/3/23.
//

import SwiftUI

struct FamilyView: View {
    
    @State var guardianName: String
    @State var info: [String]
    @StateObject private var vm = ScooperViewModel()
    @StateObject private var login = LoginViewModel()
    
    var body: some View {
        
        VStack {
            ZStack(alignment: .center) {
                Circle()
                    .frame(width: 100, height: 100, alignment: .center)
                    .foregroundStyle(.blue)
                
                Text(guardianName.first?.description ?? "")
                    .font(.system(size: 50))
                    .foregroundStyle(.white)
                
            }
            
            Text(guardianName)
                .font(.largeTitle.bold())
                .padding(.bottom)
            
            ScrollView(.vertical) {
                Text("Phone")
                    .fontWeight(.bold)
                
                Text(info[2])
                    .padding(.bottom)
                    .foregroundStyle(.blue)
                
                Text("Email")
                    .fontWeight(.bold)
                
                Text(info[1])
                    .padding(.bottom)
                
                Text("Vehicle: \(info[3])")
                    .fontWeight(.bold)
                
                HStack {
                    Text("Make: \(info[4])")
                    Text("Model: \(info[5])")
                }
                
                
                HStack {
                    Text("Year: \(info[6])")
                    Text("Color: \(info[7])")
                }
                .padding(.bottom)
            
                Text("Family")
                    .font(.title.bold())
                
                ScrollView(.horizontal) {
                    HStack {
                        ForEach(vm.familyStatus) { student in
                            VStack {
                                ZStack {
                                    Circle()
                                        .frame(width: 130, height: 130)
                                        .foregroundStyle(.scooperGreen.opacity(0.4))
                                    
                                    Circle()
                                        .frame(width: 110, height: 110)
                                        .foregroundColor(.scooperGreen)
                                    
                                    Text(student.name.first?.description ?? "")
                                        .foregroundStyle(.scooperYellow)
                                        .font(.system(size: 70).bold())
                                }
                                
                                Text(student.name)
                                    .fontWeight(.bold)
                            }
                        }
                    }
                }
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(.gray.opacity(0.2))
            .ignoresSafeArea()
        }
        .onAppear(perform: {
            login.loadCurrentUser()
            Task {
                try await vm.getChilren(name: login.name ?? "")
            }
        })
    }
}

#Preview {
    FamilyView(guardianName: "John Doe", info: ["John Doe Jr", "john@test.com", "404-342-4245", "XCD1232", "Honda", "Accord", "2013", "Gray", "Son"])
}
