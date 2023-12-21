//
//  RequestView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/2/23.
//

import SwiftUI

struct RequestView: View {
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @Binding var id: String
    
    var body: some View {
        List {
            ScrollView {
                ForEach(vm.scoopRequest) { request in
                    HStack(alignment: .firstTextBaseline, spacing: 30) {
                        VStack {
                            Text("Status")
                            
                            if request.status {
                                Circle()
                                    .frame(width: 5, height: 5)
                                    .foregroundStyle(.green)
                            } else {
                                Circle()
                                    .frame(width: 5, height: 5)
                                    .foregroundStyle(.red)
                            }
                        }
                        
                        
                        VStack {
                            Text("Student")
                            
                            HStack {
                                Text(request.student)
                                    .lineLimit(2)
                            }
                        }
                        
                        
                        VStack {
                            Text("Release Date")
                            Text(request.date)
                        }
                    }
                }
            }
        }
        .onAppear(perform: {
            Task {
                do {
                    try await vm.getScoopRequest(id: id)
                } catch {
                    print(error)
                }
            }
        })
        .onChange(of: vm.scoopRequest) {
            Task {
                try await vm.getScoopRequest(id: id)
            }
        }
    }
}

#Preview {
    RequestView(id: .constant("fgjlsnr"))
}