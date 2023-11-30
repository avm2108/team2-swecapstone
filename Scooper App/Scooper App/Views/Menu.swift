//
//  Menu.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI

struct Menu: View {
    var body: some View {
        
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            
            VStack(alignment: .leading,spacing: 30) {
                Spacer()
                
                NavigationLink {
                    StudentMenuView()
                } label: {
                    VStack {
                        HStack(spacing: 10) {
                            Image(systemName: "person.crop.rectangle")
                                .resizable()
                                .frame(width: 45, height: 35)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Students")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                .padding(.leading, 80)
                
                NavigationLink {
                    SchedulingView()
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "calendar.badge.clock")
                                .resizable()
                                .frame(width: 50, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Scheduling")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                .padding(.leading, 80)
                
                Spacer()
                
                Button {
                    //logout
                } label: {
                    Text("Logout")
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
        }
    }
}

#Preview {
    Menu()
}
