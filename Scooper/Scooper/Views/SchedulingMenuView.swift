//
//  SchedulingMenuView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/4/23.
//

import SwiftUI

struct SchedulingMenuView: View {
    
    var body: some View {
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            
            VStack(alignment: .leading, spacing: 30) {
                
                Text("Request Menu")
                    .font(.largeTitle.bold())
                    .foregroundStyle(.white)

                
                NavigationLink {
                    RequestView()
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "list.bullet.clipboard.fill")
                                .resizable()
                                .frame(width: 30, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("View Requests")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                
                NavigationLink {
                    StudentSelectMenu()
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "calendar.badge.clock")
                                .resizable()
                                .frame(width: 50, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Request Scoop Up")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                .padding(.trailing)
                
                Spacer()
            }
        }
    }
}

#Preview {
    SchedulingMenuView()
}